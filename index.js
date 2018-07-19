module.exports = function({ types: t }) {
  const consoleMethods = ['log', 'info', 'warn', 'error'];

  return {
    visitor: {
      CallExpression(path, state) {
        const callee = path.get('callee');
        const object = callee.get('object');
        const property = callee.get('property');

        if (path.node.isClean) return;

        if (!callee.isMemberExpression()) return;

        if (!isConsoleMethod(property)) return;

        let parentName = undefined;
        let newArguments = [];

        try {
          parentName = path.getFunctionParent().node.id.name;
          newArguments.push(t.stringLiteral(`${parentName}()`));
        } catch (ex) {}

        path.node.arguments.forEach(function(arg) {
          if (t.isIdentifier(arg)) {
            newArguments.push(t.stringLiteral(arg.name));
          }

          newArguments.push(arg);
        });

        var expression = t.callExpression(t.memberExpression(object.node, property.node), newArguments);
        expression.isClean = true;

        path.replaceWith(expression);
      },
    },
  };

  function isConsole(id) {
    const name = 'console';
    return id.isIdentifier({ name }) && !id.scope.getBinding(name) && id.scope.hasGlobal(name);
  }

  function isConsoleMethod(property) {
    return consoleMethods.some(name => property.isIdentifier({ name }));
  }
};
