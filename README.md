# Express-MySQL Example

### Installation
- npm install
- import mysql-api.sql
- nodemon index.js
- open postman (to insert for example)
  - on URL box, select POST and type `http://localhost:3000/api/tasks`
  - on Headers tab
    - under Key column, type Content-Type
    - under Value column, type application/json
  - on Body tab
    - select radio button raw
    - paste...
    ```json
    {
        "task_name": "Task One",
        "task_desc": "sing it like DEAN"
    }
    ```
  - click Send
