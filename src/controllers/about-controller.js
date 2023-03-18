// controller to set the content of the about-view
export const aboutController = {
    index: {
      handler: function (request, h) {
        const viewData = {
          title: "About myWildAtlanticWay",
        };
        return h.view("about-view", viewData);
      },
    },
  };
  