# Konnect

Welcome to Konnect, a dynamic social media platform designed to foster communication and social interaction. Our goal is to enable users to connect, share content, and engage with others in an interactive online community. Whether it's through sharing posts, liking content, or following other users, Konnect provides a seamless experience for building and maintaining social connections. The app features user-friendly functionalities such as AI-generated captions, making content creation effortless and engaging. Built using Express.js, React, and MongoDB, Konnect is crafted to deliver an intuitive and enjoyable social networking experience.

## Features

- **Secure Signup and Login**: Konnect ensures that user data is protected through JSON Web Token (JWT) authentication. When users sign up or log in, a secure token is generated and used to authenticate subsequent requests, keeping user sessions safe and secure.

- **Share Photos and Videos**: Users can easily share their moments by uploading photos or videos and add personalized captions to their posts, making content more engaging and expressive. For users who may need inspiration or are short on time, the platform integrates a generative AI feature that can create captions for their posts. Users can also engage with content by liking or disliking posts.

- **Chronological Feed**: The timeline feature allows users to view posts from the people they follow in chronological order so that the users never miss out on the latest updates from their connections.

- **Build Your Network**: Konnect enables users to follow others within the app. By following a user, their posts will appear in your timeline, allowing you to stay updated with their latest content. If needed, users can also unfollow others to tailor their social feed to their preferences.

- **Profile Management**: Users can update their personal information at any time through their profile settings. This includes changing profile pictures, updating bios, and other details to reflect their current status and personality.

## Run Locally

Clone the project

```bash
git clone https://github.com/paridhi-baruah/Konnect.git
```

Go to the project directory

```bash
cd Konnect
```

### Install dependencies

#### In Client

```bash
cd client
yarn i
```

#### In Server

```bash
cd server
npm i
```

### Environment Variables

To run this project, you will need to add the following environment variables to your `.env` file in the server directory:

- `MONGO_DB`: Your MONGO_DB URL
- `JWT_KEY`: Your secret key for JWT
- `API_KEY`: Your secret key for Gemini API

### Run the Application

#### Run Client

```bash
cd client
yarn start
```

#### Run Server

```bash
cd server
npm start
```

Open your web browser and visit [http://localhost:3000](http://localhost:3000) to access Konnect.

## Usage (Testing)

Make sure you have completed the installation steps mentioned in the README.

1. **Sign Up for an Account**
   - Click on the "Signup" link.
   - Provide the required information, such as firstname, lastname, username and password, to create a new account.

2. **Log in to Your Account**
   - Enter your credentials (username and password) to log in to your account.

3. **Explore Features**
   - **Create and Share Posts**: Navigate to Home page or Profile page to upload photos or videos. Add your own caption or use the AI-generated caption feature.
   - **View Your Timeline**:The posts by users you follow can be seen on the Home page.
   - **Like/Dislike Content**: Engage with posts by liking or disliking them.
   - **Follow/Unfollow Users**: Interact with other user profiles to follow or unfollow them.
   - **Update Personal Information**: Go to your profile information section of profile page to update your personal details.

---
## Screenshots
**LogIn Screen**
![image](https://github.com/user-attachments/assets/9d62a226-f153-4ef3-a397-c34a010d0195)

**SignUp Screen**
![image](https://github.com/user-attachments/assets/55b27ef6-7f84-4536-92a6-0e3e9473aed5)

**Home Feed**
![image](https://github.com/user-attachments/assets/a121776c-e0b8-4a85-974a-99a89127903b)

**My Profile**
![image](https://github.com/user-attachments/assets/39813e1b-348a-410d-8266-d07077c2ac0f)

**AI-generated Caption Feature Screen**
![image](https://github.com/user-attachments/assets/e97beb76-745e-4fca-a798-795588009ff5)

**Update Personal Information**
![image](https://github.com/user-attachments/assets/43754e8c-7cd2-46ea-b968-06bcd8795778)


