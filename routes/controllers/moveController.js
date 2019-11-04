module.exports = class MoveController {
    constructor(MoveService) {
        this.moveService = MoveService;
    }

    async getMove(req, res) {
        const id = req['params']['id'];
        const move = await this.moveService.getMove(id);

        return res.json(move);
    }
}