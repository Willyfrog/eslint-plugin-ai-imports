// This is just an example file to demonstrate the rule
// In a real project, you would have proper Jest types imported

// Mock declaration for demonstration purposes
declare namespace jest {
  type Mock<T = any> = {
    mockImplementation: (fn: () => T) => void;
  };
  function fn(): Mock;
  function mocked<T>(item: T): T & Mock;
}

// Examples of incorrect usage that will trigger the rule
const myMock = jest.fn();
(myMock as jest.Mock).mockImplementation(() => 'mocked value');

const anotherMock = jest.fn();
(anotherMock as jest.Mock).mockImplementation(() => 42);

// Examples of correct usage
jest.mocked(myMock).mockImplementation(() => 'correct mocked value');
jest.mocked(anotherMock).mockImplementation(() => 123); 