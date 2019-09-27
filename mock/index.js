module.exports = {
    _proxy: {
        proxy: {
          '/test': 'http://127.0.0.1:8000/test',
        },
        changeHost: true,
      },

    [`GET /api/user`]: (req, res) => {
    return res.json({
        id: 1,
        username: 'ciel',
        hello: 'hi'
        });
    }
}