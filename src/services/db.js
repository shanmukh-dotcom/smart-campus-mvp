// src/services/db.js

const INITIAL_DATA = {
  users: [
    { id: 'temp_1', name: 'John Doe', role: 'Student' },
    { id: 'temp_2', name: 'Jane Smith', role: 'Student' }
  ],
  issues: [
    { id: 1, title: 'WiFi down in Library', description: 'No internet connection in main reading hall', status: 'open', authorId: 'temp_1', createdAt: new Date().toISOString() },
    { id: 2, title: 'Broken chair in CS Lab 301', description: 'Chair at PC 12 is broken', status: 'resolved', authorId: 'temp_2', createdAt: new Date().toISOString() },
    { id: 3, title: 'Water cooler empty', description: 'First floor block B', status: 'open', authorId: 'temp_1', createdAt: new Date().toISOString() }
  ],
  announcements: [
    { id: 1, title: 'Mid Semester Exams Scheduled', content: 'Exams will begin from next Monday.', date: new Date().toISOString() },
    { id: 2, title: 'Campus Fest 2024', content: 'Join us for the annual cultural festival!', date: new Date().toISOString() }
  ],
  locations: [
    { id: 1, name: 'Main Library', building: 'Building · Ground', type: 'Library' },
    { id: 2, name: 'CS Lab 301', building: 'Lab · 3rd Floor', type: 'Lab' },
    { id: 3, name: 'Student Cafeteria', building: 'Building · 1st Floor', type: 'Food' }
  ],
  posts: [
    { id: 1, question: 'What is the syllabus for Data Structures mid-term?', authorId: 'temp_1', upvotes: 12, important: true, comments: [{id: 1, authorId: 'temp_2', text: 'Chapters 1-5'}] },
    { id: 2, question: 'Anyone has notes for OS lecture 4?', authorId: 'temp_3', upvotes: 5, important: false, comments: [] }
  ],
  lost_found: [
    { id: 1, type: 'lost', item: 'Blue Water Bottle', description: 'Lost near the cafeteria', contact: 'user123', createdAt: new Date().toISOString() },
    { id: 2, type: 'found', item: 'Calculator', description: 'Found in CS Lab 301', contact: 'admin', createdAt: new Date().toISOString() }
  ],
  messages: [
    { id: 1, groupId: 'general', authorId: 'temp_2', text: 'Hey everyone!', timestamp: new Date().toISOString(), isAi: false },
    { id: 2, groupId: 'general', authorId: 'ai', text: 'Hello! I am Buddy, your AI assistant. Tag @buddy for help.', timestamp: new Date().toISOString(), isAi: true }
  ],
  crowdInsights: [
    { locationId: 3, level: 'high', timestamp: new Date().toISOString() }
  ]
};

export const DB = {
  init() {
    if (!localStorage.getItem('smartcampus_data')) {
      localStorage.setItem('smartcampus_data', JSON.stringify(INITIAL_DATA));
    }
  },
  
  read(collection) {
    const data = JSON.parse(localStorage.getItem('smartcampus_data')) || INITIAL_DATA;
    return data[collection] || [];
  },
  
  write(collection, items) {
    const data = JSON.parse(localStorage.getItem('smartcampus_data')) || INITIAL_DATA;
    data[collection] = items;
    localStorage.setItem('smartcampus_data', JSON.stringify(data));
  },
  
  add(collection, item) {
    const items = this.read(collection);
    const newItem = { ...item, id: Date.now().toString() };
    items.push(newItem);
    this.write(collection, items);
    return newItem;
  },

  update(collection, id, updates) {
    const items = this.read(collection);
    const index = items.findIndex(i => i.id == id);
    if (index > -1) {
      items[index] = { ...items[index], ...updates };
      this.write(collection, items);
      return items[index];
    }
    return null;
  },
  
  getCurrentUser() {
    const userId = localStorage.getItem('smartcampus_user_id');
    if (!userId) return null;
    const users = this.read('users');
    return users.find(u => u.id === userId) || null;
  },
  
  login(accessCode, role = 'Student') {
    if (accessCode.trim().toUpperCase() === 'CAMPUS2024') {
      const users = this.read('users');
      const newUserId = 'student_' + Date.now();
      const newUser = { id: newUserId, role, name: 'Shanmukh Kumar', joinedAt: new Date().toISOString(), premium: false };
      users.push(newUser);
      this.write('users', users);
      localStorage.setItem('smartcampus_user_id', newUserId);
      return newUser;
    }
    return null;
  },
  
  logout() {
    localStorage.removeItem('smartcampus_user_id');
  }
};
