import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Comment, OutPutComment, User } from '../app.model';
@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
})
export class CommentComponent implements OnInit {
  @Input() comment!: Comment;
  @Input() currentUser!: User;
  @Output() delete: EventEmitter<number | string> = new EventEmitter();
  @Output() reply: EventEmitter<OutPutComment> = new EventEmitter();
  @Output() edit: EventEmitter<OutPutComment> = new EventEmitter();

  replyStatus: boolean = false;
  editStatus: boolean = false;
  editContent: string = '';
  showReplyBox() {
    this.replyStatus = true;
  }
  showEditBox() {
    this.editStatus = true;
  }

  deleteComment(id: number | string | undefined) {
    this.delete.emit(id);
  }

  replyComment(commentId: string | number, replyContent: string) {
    this.reply.emit({
      id: commentId,
      content: replyContent,
    });
    this.replyStatus = false;
  }
  editComment(commentId: string | number, editedContent: string) {
    this.edit.emit({
      id: commentId,
      content: editedContent,
    });
    this.editStatus = false;
  }
  ngOnInit(): void {}
}
