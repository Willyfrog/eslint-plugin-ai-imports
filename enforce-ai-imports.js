// enforce-ai-imports.js

module.exports = {
    meta: {
        type: "suggestion",
        docs: {
            description: "Enforce using jest.mocked() instead of type casting with jest.Mock",
            category: "Best Practices",
            recommended: true,
        },
        fixable: "code",
        schema: [], // no options
        messages: {
            useJestMocked: "Use jest.mocked() instead of type casting with jest.Mock"
        }
    },
    create(context) {
        // Helper function to check if a type assertion is using jest.Mock
        function isJestMockTypeAssertion(typeAssertion) {
            return typeAssertion.typeAnnotation.type === 'TSTypeReference' &&
                typeAssertion.typeAnnotation.typeName &&
                ((typeAssertion.typeAnnotation.typeName.type === 'TSQualifiedName' &&
                  typeAssertion.typeAnnotation.typeName.left.name === 'jest' &&
                  typeAssertion.typeAnnotation.typeName.right.name === 'Mock') ||
                 (typeAssertion.typeAnnotation.typeName.type === 'Identifier' &&
                  typeAssertion.typeAnnotation.typeName.name === 'Mock' &&
                  context.getScope().through.some(ref => 
                    ref.identifier.name === 'jest' && ref.resolved)));
        }

        return {
            // Check for any TSAsExpression that uses jest.Mock
            "TSAsExpression"(node) {
                if (isJestMockTypeAssertion(node)) {
                    context.report({
                        node,
                        messageId: "useJestMocked",
                        fix: function(fixer) {
                            const sourceCode = context.getSourceCode();
                            const expressionText = sourceCode.getText(node.expression);
                            
                            return fixer.replaceText(
                                node,
                                `jest.mocked(${expressionText})`
                            );
                        }
                    });
                }
            },
            
            // Also check for MemberExpressions where the object is a TSAsExpression using jest.Mock
            "MemberExpression[object.type='TSAsExpression']"(node) {
                const typeAssertion = node.object;
                
                if (isJestMockTypeAssertion(typeAssertion)) {
                    context.report({
                        node,
                        messageId: "useJestMocked",
                        fix: function(fixer) {
                            const sourceCode = context.getSourceCode();
                            const expressionText = sourceCode.getText(typeAssertion.expression);
                            const propertyText = sourceCode.getText(node.property);
                            
                            // Replace the entire MemberExpression to avoid parentheses
                            return fixer.replaceText(
                                node,
                                `jest.mocked(${expressionText}).${propertyText}`
                            );
                        }
                    });
                }
            }
        };
    }
};