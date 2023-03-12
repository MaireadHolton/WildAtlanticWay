export const communityController = {
    index: {
      handler: function (request, h) {
        const viewData = {
          title: "myWildAtlanticWay",
        };
        return h.view("community-view", viewData);
      },
    },
  };