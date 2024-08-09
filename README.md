# Saeed's Suggestion Box

This is a simple suggestion box web app built with React. It uses mock data and can handle generating and adding suggestions, and adding comments.

## Technology Stack

- **React**: Framework used for building the user interface.
- **JSX**: Used for writing component structure and logic.
- **Tailwind CSS**: Used for styling.
- **Lucide**: Used for adding icons to the UI.
- **React Router**: Handles routing.

## Features

- View a list of suggestions
- Create new suggestions
- Comment on existing suggestions
- Generate random suggestions

## High Level Flow

- Main home page displays a grid of cards, with each card being a suggestion. The header contains a toggle for "Home" and "Add".
- There is a button to generate a random suggestion, which will randomly choose a hardcoded title and description and display it on the main page.
- Toggling from Home to Add displays the Add Suggestion form, which is a standalone component. This form can be used to add suggestions.
- Clicking on a Suggestion card opens the Suggestion Info Component, which renders the Comment Form within it. Here, you can view the full description of the suggestion, previous comments, and new (your own) comments, as well as post new comments.

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

## Known Bugs

- After viewing a specific suggestion's info, refreshing the page shows an infinite loading state. Good for hypnosis, but ultimately it's due to the in-memory storage being cleared.

## Future Considerations

If I were to create a feature like this in production and have more time to develop it, there are many different things I would change. Obviously, instead of mocking data and using in memory data structures to store data, I would have an API handling the data retrieval from an SQL database which would be called using Axios. I'd also implement better form validation and data sanitization, as well as user accounts (so you don't have to manually input your name for each comment). I'd also have better error handling within the code. Redux would also be the next step for me for state management, instead of just using hooks.

Future features would also include editing comments, deleting/marking closed/in progress for suggestions and comments. Also better styling and animations in general. 

I hope you like the app!
