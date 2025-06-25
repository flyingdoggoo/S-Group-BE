import defaultService from "../service/default.service";
import Polls from "../models/poll.model";

jest.mock("../models/poll.model")

describe("DefaultService - GetAll Polls", () => {
    test("should return all polls", async() => {
        const mockPolls = [
        {
            _id: '123',
            title: 'Bầu Chủ Tịch',
            description: 'Ai là người xứng đáng?',
            options: [
            { text: 'Nguyễn Văn A', votes: 10, userVote: [] },
            { text: 'Trần Thị B', votes: 5, userVote: [] }
            ],
            creator: { _id: 'u1', username: 'admin' },
            votesCount: 15,
            isLocked: false
        }
        ];

        const findMock = {
            populate: jest.fn().mockReturnThis(),
            select: jest.fn().mockReturnThis(),
            skip: jest.fn().mockReturnThis(),
            limit: jest.fn().mockResolvedValue(mockPolls),
        };

        Polls.find.mockReturnValue(findMock)
        Polls.countDocuments.mockResolvedValue(12)

        const result = await defaultService.GetAllPoll(2, 5)

        expect(Polls.find).toHaveBeenCalled()
        expect(Polls.countDocuments).toHaveBeenCalled()
        expect(findMock.skip).toHaveBeenCalledWith(5)
        expect(findMock.limit).toHaveBeenCalledWith(5)

        expect(result).toEqual({
            message: "success",
            data: mockPolls,
            total: 12,
            page: 2,
            totalPage: 3
        })
    })
})