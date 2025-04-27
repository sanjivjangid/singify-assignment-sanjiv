## Assignment Details:

The attached JSON file contains the geo-locations of all streetlights in a city. Additionally, we have provided a sample UI screenshot for reference.

We request you to develop a React application that fetches streetlights from a backend API, following these guidelines:

## Streetlight Grouping:
Streetlights are categorized into three groups:
Street1 (group=1)
Street2 (group=2)
Street3 (group=3)
## Filtering & Interaction:
Selecting a group from the left panel should render only the streetlights in that selected group on the map.
Clicking on a selected group should deselect it, displaying all streetlights again.
Clicking on any empty space on the map should open a popup to allow the addition of a new streetlight at that location.
Add streetlight popup must accept a name and allow to select a group from dropdown.
## UI Considerations:
Any similar icons can be used for representation.
Width, height, margin, padding, color, etc. can be anything of your choice.
UI must be responsive.
## Backend API Requirements:
The backend APIs must follow a well-known design pattern and should also be accessible for any other third-party UI applications.
## Testing & Code Quality:
Implement test cases for both frontend and backend applications.
Ensure there are no linting issues in your implementation.