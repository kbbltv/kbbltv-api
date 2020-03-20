const Media = require("./media.model");

module.exports = {
  create: async (req, res) => {
    try {
      await Media.create(req.body);
      return res.status(201).json(req.body);
    } catch (e) {
      console.error(e);
      return res.status(500).send("Some error has ocurred, but i dont give a shit.");
    }
  },
  search: async (req, res) => {
    const { page, search } = req.query;
    const limit = 24;
    try {
      const querySearch = search ? query(search) : {};
      const response = await Media.paginate(querySearch, { page, limit });
      return res.status(200).json(response);
    } catch (e) {
      console.error(e);
      return res.status(500).send("Some error has ocurred, but i dont give a shit.");
    }
  },
  get: async (req, res) => {
    try {
      const media = await Media.findOne(req.query);
      if (media) {
        return res.status(404).send("Media not found, are you retard?");
      } else {
        return res.status(200).json(media);
      }
    } catch (error) {
      console.error("Estranho isso...");
      return res.status(500).send("A wild garcia appears.");
    }
  }
};

function query(search) {
  return {
    $or: [
      { name: new RegExp(search, "gi") },
      { address: search },
      { id_player: search }
    ]
  };
}
