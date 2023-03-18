// controller to set the content of the community-view
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