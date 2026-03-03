server/
├── index.js                          # Main server file
├── package.json                      # Dependencies
├── .env                              # Environment variables (create this)
├── .env.example                      # Environment template
│
├── config/
│   └── database.config.js            # MongoDB connection
│
├── models/
│   ├── User.model.js                 # User schema
│   ├── Idea.model.js                 # Idea/pitch schema
│   └── Connection.model.js           # Connection schema
│
├── controllers/
│   ├── auth.controller.js            # Authentication logic
│   ├── ideas.controller.js           # Ideas/pitches logic
│   ├── users.controller.js           # Users logic
│   └── connections.controller.js     # Connections logic
│
├── middleware/
│   ├── auth.middleware.js            # JWT authentication
│   ├── error.middleware.js           # Error handling
│   └── validation.middleware.js      # Request validation
│
└── routes/
    ├── auth.routes.js                # Auth endpoints
    ├── ideas.routes.js               # Ideas endpoints
    ├── connections.routes.js         # Connections endpoints
    └── users.routes.js               # Users endpoints