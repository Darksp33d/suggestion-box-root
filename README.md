# Saeed's Suggestion Box

This is a simple suggestion box web app built with React. It uses a Node.js/Express backend API with SQLite database to handle generating and adding suggestions, and adding comments.

## Technology Stack

- **React**: Framework used for building the user interface.
- **JSX**: Used for writing component structure and logic.
- **Tailwind CSS**: Used for styling.
- **Lucide**: Used for adding icons to the UI.
- **React Router**: Handles routing.
- **Axios**: Used for making HTTP requests to the backend API.

## Features

- View a list of suggestions
- Create new suggestions
- Comment on existing suggestions
- Generate random suggestions
- Delete suggestions and comments

## High Level Flow

- Main home page displays a grid of cards, with each card being a suggestion. The header contains a toggle for "Home" and "New".
- There's a "Random" button in the navigation to generate a random suggestion, which will randomly choose a hardcoded title and description and display it on the main page.
- Clicking "New" displays the Add Suggestion form, which is a standalone component. This form can be used to add suggestions.
- Clicking on a Suggestion card opens the Suggestion Info Component, which renders the Comment Form within it. Here, you can view the full description of the suggestion, previous comments, and add new comments.
- You can now delete suggestions and comments directly from the UI.

## Installation

To get the project up and running:

1. Clone the repository.

2. Install the dependencies:
   ```
   npm install
   ```

## Running the App

After installation, you can run the app using:

```
npm start
```

This will start the development server. Open [http://localhost:3000](http://localhost:3000) to view the app in browser.

Make sure the backend API is also running (see API README for instructions).

## Known Bugs

- No known bugs at the moment. The infinite loading state issue has been resolved with the implementation of the backend API.

## Future Considerations

If I were to create a feature like this in production and have more time to develop it, there are many different things I would change. I'd implement better form validation and data sanitization, as well as user accounts (so you don't have to manually input your name for each comment). I'd also have better error handling within the code and use something like i18n for localization. Redux would also be the next step for me for state management, instead of just using hooks. Finally, there are some general optimizations I would include if working with real, larger datasets, like memoizing to avoid full page re-renders.

Future features would also include editing comments, marking suggestions as closed/in progress. Also better styling and animations in general. 

I hope you like the app!