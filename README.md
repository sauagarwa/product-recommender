# Product Recommender

## Backend

1. Install Dependencies

   Install the dependencies

   ```bash
    python3.10 -m venv venv
    source venv/bin/activate
    pip3 install -r recommender-backend/requirements.txt
   ```

2. Start server

   Start the backend server

   ```bash
   ./venv/bin/uvicorn backend.main:app --reload --port 8080
   ```

## Frontened

1. Install Dependencies

   Install the dependencies

   ```bash
    cd ui
    npm install
   ```

2. Start server

   Start the backend server

   ```bash
   npm run dev  
   ```

    Server will be running at http://localhost:5173/

3. Launch

    Launch the [ui](http://localhost:5173/)

    Enter the Login credentials: `user@example.com/1234`