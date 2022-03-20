import { Component, OnInit } from '@angular/core';
import { CommentsDataService } from './comments-data.service';
import { Comment, CommentNoReplies, OutPutComment, User } from './app.model';
import { v4 as uuidv4 } from 'uuid';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [CommentsDataService],
})
export class AppComponent implements OnInit {
  comments: Comment[] = [];
  currentUser: any = null;
  newCommentText: string = '';

  constructor(private CommentsDataService: CommentsDataService) {}

  addNewComment() {
    if (this.currentUser) {
      const newComment: Comment = {
        id: uuidv4(),
        content: this.newCommentText,
        createdAt: '1 minute ago',
        score: 0,
        user: this.currentUser,
        replies: [],
      };
      this.comments.push(newComment);
    }
  }

  deleteCommentHandler(id: number | string | undefined) {
    if (id) {
      const deleteCommentIdx: number = this.comments.findIndex(
        (el) => el.id === id
      );
      if (deleteCommentIdx === -1) {
        this.comments.forEach((el1, i) => {
          el1.replies.forEach((el2, j) => {
            if (el2.id === id) {
              this.comments[i].replies.splice(j, 1);
            }
          });
        });
      } else {
        this.comments.splice(deleteCommentIdx, 1);
      }
    }
  }

  replyCommentHandler(replyComment: OutPutComment) {
    const newComment: CommentNoReplies = {
      id: uuidv4(),
      content: replyComment.content,
      createdAt: '1 minute ago',
      score: 0,
      user: this.currentUser,
    };
    const idx = this.comments.findIndex((el) => el.id === replyComment.id);
    this.comments[idx].replies.push(newComment);
  }

  editContentHandler(editComment: OutPutComment) {
    const commentIdx = this.comments.findIndex(
      (el) => el.id === editComment.id
    );
    if (commentIdx !== -1) {
      this.comments[commentIdx] = {
        ...this.comments[commentIdx],
        content: editComment.content,
      };
    } else {
      this.comments.forEach((_, i) => {
        _.replies.forEach((el2, j) => {
          if (el2.id === editComment.id) {
            el2.content = editComment.content;
          }
        });
      });
    }
  }

  ngOnInit(): void {
    this.comments = this.CommentsDataService.getComments();
    this.currentUser = this.CommentsDataService.getCurrentUser();
    console.log('Comments List: ', this.comments);
  }
}
