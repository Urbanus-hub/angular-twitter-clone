import { Component, OnInit, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from './services/api.service';

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  avatar: string;
  bio?: string;
  posts?: number;
  followers?: number;
  following?: number;
}

interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}

interface Comment {
  id: number;
  postId: number;
  name: string;
  body: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title: string = "Twitter Clone";
  
  users = signal<User[]>([]);
  posts = signal<Post[]>([]);
  comments = signal<Comment[]>([]);
  
  selectedUserId = signal<number>(1);
  selectedPostId = signal<number>(0);

  // Computed signal for the selected user
  selectedUser = computed(() => {
    const user = this.users().find(u => u.id === this.selectedUserId());
    return user ? {
      ...user,
      // Default values if not provided
      posts: Math.floor(Math.random() * 100),
      followers: Math.floor(Math.random() * 1000),
      following: Math.floor(Math.random() * 500),
      bio: user.bio || 'No bio available',
      avatar: user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username}`
    } : {} as User;
  });

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.apiService.getUsers().subscribe(users => {
      // Enhance users with additional profile information
      const enhancedUsers = users.map(user => ({
        ...user,
        posts: Math.floor(Math.random() * 100),
        followers: Math.floor(Math.random() * 1000),
        following: Math.floor(Math.random() * 500),
        bio: `Software engineer and tech enthusiast from ${user.address.city}`,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username}`
      }));

      this.users.update(() => enhancedUsers);
      
      // Select first user by default
      if (enhancedUsers.length > 0) {
        this.selectedUserId.set(enhancedUsers[0].id);
        this.loadPosts(enhancedUsers[0].id);
      }
    });
  }

  loadPosts(userId: number) {
    this.apiService.getPostsByUser(userId).subscribe(posts => {
      this.posts.update(() => posts);
      
      // Select first post if available
      if (posts.length > 0) {
        this.selectedPostId.set(posts[0].id);
        this.loadComments(posts[0].id);
      } else {
        // Clear comments if no posts
        this.comments.set([]);
        this.selectedPostId.set(0);
      }
    });
  }

  loadComments(postId: number) {
    this.apiService.getCommentsByPost(postId).subscribe(comments => {
      this.comments.update(() => comments);
    });
  }

  onUserChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const newUserId = Number(selectElement.value);
    
    // Update selected user and load their posts
    this.selectedUserId.set(newUserId);
    this.loadPosts(newUserId);
  }

  onPostSelect(postId: number) {
    // Update selected post and load its comments
    this.selectedPostId.set(postId);
    this.loadComments(postId);
  }
}