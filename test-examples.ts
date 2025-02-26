// This is just an example file to demonstrate the rule
// In a real project, you would have proper Jest types imported

// Mock declaration for demonstration purposes
declare namespace jest {
  type Mock = any;
  function fn(): any;
  function mocked<T>(item: T): T;
}

// Example interfaces and functions for testing
interface DatabaseManager {
  getServerDatabaseAndOperator(): any;
}

interface RecentReactionsQueries {
  getRecentReactions(): Promise<any[]>;
}

interface Operator {
  handleSystem(data: any): void;
}

// Mock implementations for testing
const mockDbManager: DatabaseManager = {
  getServerDatabaseAndOperator: jest.fn()
};

const mockReactionsQueries: RecentReactionsQueries = {
  getRecentReactions: jest.fn()
};

const mockOperator: Operator = {
  handleSystem: jest.fn()
};

// Examples of incorrect usage that will trigger the rule
// Case 1: mockImplementation
const myMock = jest.fn();
(myMock as jest.Mock).mockImplementation(() => 'mocked value');

// Case 2: mockReturnValue
const dbMock = jest.fn();
(dbMock as jest.Mock).mockReturnValue({ db: 'test', operator: {} });

// Case 3: mockResolvedValue
const reactionsMock = jest.fn();
(reactionsMock as jest.Mock).mockResolvedValue([{ id: 1, reaction: '👍' }]);

// Case 4: Accessing mock property
const systemMock = jest.fn();
(systemMock as jest.Mock).mock.calls[0][0];

// Case 5: Just the type assertion without property access
const fetchChannelsMock = jest.fn();
const fetchChannels = fetchChannelsMock as jest.Mock;

// Case 6: Real-world examples from the user's codebase
const recentReactionsQueries = { getRecentReactions: jest.fn() };
(recentReactionsQueries.getRecentReactions as jest.Mock).mockResolvedValue([]);

const DatabaseManager = { getServerDatabaseAndOperator: jest.fn() };
(DatabaseManager.getServerDatabaseAndOperator as jest.Mock).mockReturnValue({});

const fetchMyChannelsForTeam = jest.fn();
(fetchMyChannelsForTeam as jest.Mock).mockImplementation(() => []);

const operator = { handleSystem: jest.fn() };
(operator.handleSystem as jest.Mock).mock.calls[0][0];

// Examples of correct usage
jest.mocked(myMock).mockImplementation(() => 'correct mocked value');
jest.mocked(dbMock).mockReturnValue({ db: 'test', operator: {} });
jest.mocked(reactionsMock).mockResolvedValue([{ id: 1, reaction: '👍' }]);
jest.mocked(systemMock).mock.calls[0][0];
jest.mocked(fetchChannelsMock);

// Correct versions of the real-world examples
jest.mocked(recentReactionsQueries.getRecentReactions).mockResolvedValue([]);
jest.mocked(DatabaseManager.getServerDatabaseAndOperator).mockReturnValue({});
jest.mocked(fetchMyChannelsForTeam).mockImplementation(() => []);
jest.mocked(operator.handleSystem).mock.calls[0][0]; 