const ComplimentsService = {
  getAllCompliments(db) {
    return db.from('compliments').select('*');
  },
  getComplimentById(db, id) {
    return db.from('compliments').select('*').where('id', id).first();
  },
};

module.exports = ComplimentsService;
