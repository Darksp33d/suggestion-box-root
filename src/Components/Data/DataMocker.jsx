//i am using uuid for generating unique ids for suggestions and comments, however in a prod environment i would retrieve from api
import { v4 as uuidv4 } from 'uuid';

class DataMocker {
  constructor() {
    //initialize suggestions and comments arrays, empty by default
    this.suggestions = [];
    this.comments = {};
    this.initMockData();
  }

  //initialize mock data

  initMockData() {
    //constants for mock suggestions with titles and descriptions
    const mockSuggestions = [
      { title: "Make your site faster!", description: "This site sucks, its too slow. Make it faster." },
      { title: "Give me free money", description: "I'm poor. Give me money" },
      { title: "Allow bitcoin", description: "Add bitcoin and other crypto for trasactions" },
      { title: "Something new", description: "Add some new features please!" },
      { title: "Delete this site", description: "Your site is horrible! Delete it!!!111!!11!! >:(" },
    ];

    //add mock suggestions with comments

    mockSuggestions.forEach(suggestion => {
      const newSuggestion = this.addSuggestion({ ...suggestion, author: "Mr. Mockito" });
      this.addComment(newSuggestion.id, { author: "John Doe", content: "Great idea!" });
      this.addComment(newSuggestion.id, { author: "Jane Doe", content: "I don't really agree..." });
      this.addComment(newSuggestion.id, { author: "Saeed Durrani", content: "Wow! This is such a great idea!" });
      this.addComment(newSuggestion.id, { author: "Anakin Skywalker", content: "I hate sand..." });
      this.addComment(newSuggestion.id, { author: "Godzilla", content: "Roar" });
    });
  }

  //add suggestion with title, description and author, and created date

  addSuggestion({ title, description, author }) {
    const newSuggestion = { id: uuidv4(), title, description, author, createdAt: new Date().toISOString() };
    this.suggestions = [...this.suggestions, newSuggestion];
    this.comments[newSuggestion.id] = [];
    return newSuggestion;
  }

  //add comment with suggestion id, author and content and created date

  addComment(suggestionId, { author, content }) {
    const newComment = { id: uuidv4(), author, content, createdAt: new Date().toISOString() };
    this.comments[suggestionId] = [...(this.comments[suggestionId] || []), newComment];
    return newComment;
  }

  //getters

  getSuggestions() { return [...this.suggestions]; }
  getSuggestion(id) { return this.suggestions.find(s => s.id === id); }
  getComments(suggestionId) { return [...(this.comments[suggestionId] || [])]; }
}

export const dataMocker = new DataMocker();

//function to generate a random suggestion

export function generateRandomSuggestion() {
  const titles = ["Make UI look better", "Optimize performance", "Add new feature", "Fix security", "Fix bug", "Integrate with Root API", "lengthTest"];
  const descriptions = [
    "Make the user interface more reactive and responsive.",
    "The app is very slow, speed it up.",
    "Add a new feature that would make the site better.",
    "Someone found a security vulnerability in the site, better fix it up before I DDOS >:)",
    "Squash this dang bug. It's annoying.",
    "There's this amazing app called Root, use their API to make this site 100000000000% better.",
    "1111111111111111111111111111111111111111111111There's this amazing app called Root, use their API to make this site 100000000000% better.There's this amazing app called Root, use their API to make this site 100000000000% better.There's this amazing app called Root, use their API to make this site 100000000000% better.There's this amazing app called Root, use their API to make this site 100000000000% better.There's this amazing app called Root, use their API to make this site 100000000000% better.There's this amazing app called Root, use their API to make this site 100000000000% better.There's this amazing app called Root, use their API to make this site 100000000000% better.There's this amazing app called Root, use their API to make this site 100000000000% better.There's this amazing app called Root, use their API to make this site 100000000000% better.There's this amazing app called Root, use their API to make this site 100000000000% better.There's this amazing app called Root, use their API to make this site 100000000000% better.There's this amazing app called Root, use their API to make this site 100000000000% better.There's this amazing app called Root, use their API to make this site 100000000000% better.There's this amazing app called Root, use their API to make this site 100000000000% better.There's this amazing app called Root, use their API to make this site 100000000000% better.There's this amazing app called Root, use their API to make this site 100000000000% better.There's this amazing app called Root, use their API to make this site 100000000000% better.There's this amazing app called Root, use their API to make this site 100000000000% better.There's this amazing app called Root, use their API to make this site 100000000000% better.There's this amazing app called Root, use their API to make this site 100000000000% better.There's this amazing app called Root, use their API to make this site 100000000000% better.There's this amazing app called Root, use their API to make this site 100000000000% better.There's this amazing app called Root, use their API to make this site 100000000000% better.There's this amazing app called Root, use their API to make this site 100000000000% better.There's this amazing app called Root, use their API to make this site 100000000000% better.There's this amazing app called Root, use their API to make this site 100000000000% better.There's this amazing app called Root, use their API to make this site 100000000000% better.There's this amazing app called Root, use their API to make this site 100000000000% better.There's this amazing app called Root, use their API to make this site 100000000000% better.There's this amazing app called Root, use their API to make this site 100000000000% better.There's this amazing app called Root, use their API to make this site 100000000000% better.There's this amazing app called Root, use their API to make this site 100000000000% better.There's this amazing app called Root, use their API to make this site 100000000000% better.There's this amazing app called Root, use their API to make this site 100000000000% better.There's this amazing app called Root, use their API to make this site 100000000000% better.There's this amazing app called Root, use their API to make this site 100000000000% better.There's this amazing app called Root, use their API to make this site 100000000000% better.There's this amazing app called Root, use their API to make this site 100000000000% better.There's this amazing app called Root, use their API to make this site 100000000000% better.There's this amazing app called Root, use their API to make this site 100000000000% better.There's this amazing app called Root, use their API to make this site 100000000000% better.",

  ];

  //return a new suggestion with a random title and description

  return dataMocker.addSuggestion({
    title: titles[Math.floor(Math.random() * titles.length)],
    description: descriptions[Math.floor(Math.random() * descriptions.length)],
    author: "John Detch",
  });
}