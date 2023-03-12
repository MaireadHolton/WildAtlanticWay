export const seedData = {
    users: {
      _model: "User",
      homer: {
        firstName: "Homer",
        lastName: "Simpson",
        email: "homer@simpson.com",
        password: "secret"
      },
      marge: {
        firstName: "Marge",
        lastName: "Simpson",
        email: "marge@simpson.com",
        password: "secret"
      },
      bart: {
        firstName: "Bart",
        lastName: "Simpson",
        email: "bart@simpson.com",
        password: "secret"
      }
    },
    lists: {
      _model: "List",
      cork: {
        title: "Cork Favourites",
        userid: "->users.bart"
      }
    },
    locations: {
      _model: "Location",
      location_1: {
        location: "Glengarriff",
        latitude: 51.75,
        longitude: 9.55,
        date: "August 2022",
        details: "overcast, went to Garnish Island",
        pictures: "garnish.jpg",
        listid: "->lists.cork"
      },
    }
  };
  