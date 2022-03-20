import data from '../data.json';

export class CommentsDataService {
  getComments() {
    return data.comments;
  }
  getCurrentUser() {
    return data.currentUser;
  }
}
