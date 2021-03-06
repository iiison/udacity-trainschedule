"use strict";

module.exports = {
  "parser": "babel-eslint",
  "globals": {},
  "root": true,
  "extends": [
    "eslint:recommended",
    "defaults/rules/eslint/best-practices/eslint",
    "defaults/rules/eslint/errors/eslint",
    "defaults/rules/eslint/es6/eslint",
    "defaults/rules/eslint/node/eslint",
    "defaults/rules/eslint/strict/eslint",
    "defaults/rules/eslint/style/eslint",
    "defaults/rules/eslint/variables/eslint"
  ],
  "parserOptions": {
    "sourceType": "module",
    "ecmaVersion": 7,
    "ecmaFeatures": {
      "experimentalObjectRestSpread": true,
      "binaryLiterals": false,
      "blockBindings": true,
      "defaultParams": true,
      "forOf": true,
      "generators": true,
      "objectLiteralComputedProperties": true,
      "objectLiteralDuplicateProperties": true,
      "objectLiteralShorthandMethods": true,
      "objectLiteralShorthandProperties": true,
      "octalLiterals": false,
      "regexUFlag": false,
      "regexYFlag": false,
      "templateStrings": true,
      "unicodeCodePointEscapes": true,
      "jsx": true
    }
  },
  "env": {
    "browser": true,
    "node": true,
    "amd": false,
    "mocha": true,
    "jasmine": false,
    "phantomjs": false,
    "jquery": false,
    "prototypejs": false,
    "shelljs": false,
    "commonjs": true,
    "es6": true,
    "node": true
  },
  "plugins": [
    "react",
    "jsx-a11y",
    "eslint-plugin-flowtype",
    "import"
  ],
  "settings": {
    "import/resolver": {
      "babel-module": {}
    }
  },
  "rules": {
    "import/no-unresolved": [2, {commonjs: true, amd: true}],
    "import/named": 2,
    "import/namespace": 2,
    "import/default": 2,
    "import/export": 2,
    "flowtype/boolean-style": [
      0,
      "boolean"
    ],
    "flowtype/define-flow-type": 1,
    "flowtype/delimiter-dangle": [
      0,
      "never"
    ],
    "flowtype/generic-spacing": [
      0,
      "never"
    ],
    "flowtype/no-weak-types": 0,
    "flowtype/require-parameter-type": 0,
    "flowtype/require-return-type": [
      0,
      "always",
      {
        "annotateUndefined": "never"
      }
    ],
    "flowtype/require-valid-file-annotation": 0,
    "flowtype/semi": [
      0,
      "always"
    ],
    "flowtype/space-after-type-colon": [
      0,
      "always"
    ],
    "flowtype/space-before-generic-bracket": [
      0,
      "never"
    ],
    "flowtype/space-before-type-colon": [
      0,
      "never"
    ],
    "flowtype/type-id-match": [
      0,
      "^([A-Z][a-z0-9]+)+Type$"
    ],
    "flowtype/union-intersection-spacing": [
      0,
      "always"
    ],
    "flowtype/use-flow-type": 1,
    "flowtype/valid-syntax": 1,
    "accessor-pairs": 0,
    "array-bracket-spacing": [2, "always", {
      "singleValue": false,
      "objectsInArrays": false,
      "arraysInArrays": false
    }],
    "array-callback-return": 2,
    "arrow-body-style": 2,
    "arrow-parens": 2,
    "arrow-spacing": 2,
    "block-scoped-var": 2,
    "block-spacing": 2,
    "brace-style": 2,
    "callback-return": 0,
    "camelcase": 2,
    "class-methods-use-this": 0,
    "comma-dangle": ["error", "only-multiline"],
    "comma-spacing": 2,
    "comma-style": 2,
    "complexity": 0,
    "computed-property-spacing": 0,
    "consistent-return": ["error", { "treatUndefinedAsUnspecified": true }],
    "consistent-this": 2,
    "constructor-super": 0,
    "curly": ["error", "multi"],
    "default-case": 2,
    "dot-location": 0,
    "dot-notation": 2,
    "eol-last": 0,
    "eqeqeq": 2,
    "func-call-spacing": 2,
    "func-names": 2,
    "func-style": 0,
    "generator-star": 0,
    "generator-star-spacing": 0,
    "global-require": 0,
    "guard-for-in": 0,
    "handle-callback-err": 0,
    "id-blacklist": 0,
    "id-length": 0,
    "id-match": 0,
    "indent": [2, 2, {
      "SwitchCase": 1,
      "VariableDeclarator": 1,
      "MemberExpression": 1,
    }],
    "init-declarations": 0,
    "jsx-a11y/anchor-has-content": 2,
    "jsx-a11y/aria-props": 2,
    "jsx-a11y/aria-proptypes": 0,
    "jsx-a11y/aria-role": 2,
    "jsx-a11y/aria-unsupported-elements": 2,
    "jsx-a11y/click-events-have-key-events": 0,
    "jsx-a11y/heading-has-content": 2,
    "jsx-a11y/href-no-hash": 2,
    "jsx-a11y/html-has-lang": 2,
    "jsx-a11y/img-has-alt": 2,
    "jsx-a11y/img-redundant-alt": 2,
    "jsx-a11y/label-has-for": 2,
    "jsx-a11y/lang": 2,
    "jsx-a11y/mouse-events-have-key-events": 2,
    "jsx-a11y/no-access-key": 2,
    "jsx-a11y/no-marquee": 0,
    "jsx-a11y/no-onchange": 2,
    "jsx-a11y/no-static-element-interactions": 2,
    "jsx-a11y/onclick-has-focus": 2,
    "jsx-a11y/onclick-has-role": 2,
    "jsx-a11y/role-has-required-aria-props": 2,
    "jsx-a11y/role-supports-aria-props": 2,
    "jsx-a11y/scope": 0,
    "jsx-a11y/tabindex-no-positive": 0,
    "jsx-quotes": [2, "prefer-single"],
    "key-spacing": 0,
    "keyword-spacing": [
      2,
      { "before": true, "after": true }
    ],
    "line-comment-position": 2,
    "linebreak-style": 2,
    "lines-around-comment": 2,
    "lines-around-directive": 0,
    "max-depth": 0,
    "max-len": 0,
    "max-lines": 0,
    "max-nested-callbacks": 0,
    "max-params": 2,
    "max-statements": 0,
    "max-statements-per-line": 0,
    "multiline-ternary": 0,
    "new-cap": 0,
    "new-parens": 2,
    "newline-after-var": 0,
    "newline-before-return": 2,
    "newline-per-chained-call": 0,
    "no-alert": 2,
    "no-array-constructor": 2,
    "no-bitwise": 2,
    "no-caller": 0,
    "no-case-declarations": 0,
    "no-catch-shadow": 2,
    "no-class-assign": 0,
    "no-cond-assign": 0,
    "no-confusing-arrow": [1, {"allowParens": true}],
    "no-console": [2, {
      allow: [
        "debug",
        "error",
        "exception",
        "trace"
      ]
    }],
    "no-const-assign": 2,
    "no-constant-condition": 2,
    "no-continue": 0,
    "no-control-regex": 0,
    "no-debugger": 2,
    "no-delete-var": 0,
    "no-div-regex": 0,
    "no-dupe-args": 2,
    "no-dupe-class-members": 2,
    "no-dupe-keys": 2,
    "no-duplicate-case": 2,
    "no-duplicate-imports": 2,
    "no-else-return": 2,
    "no-empty": 2,
    "no-empty-character-class": 2,
    "no-empty-function": 2,
    "no-empty-pattern": 2,
    "no-eq-null": 2,
    "no-eval": 2,
    "no-ex-assign": 2,
    "no-extend-native": 2,
    "no-extra-bind": 2,
    "no-extra-boolean-cast": 2,
    "no-extra-label": 2,
    "no-extra-parens": [2, "all", {
      "conditionalAssign": false,
      "returnAssign": false,
      "nestedBinaryExpressions": false
    }],
    "no-extra-semi": 2,
    "no-fallthrough": 2,
    "no-floating-decimal": 2,
    "no-func-assign": 0,
    "no-global-assign": 0,
    "no-implicit-coercion": 2,
    "no-implicit-globals": 2,
    "no-implied-eval": 2,
    "no-inline-comments": 0,
    "no-inner-declarations": 0,
    "no-invalid-regexp": 2,
    "no-invalid-this": 0,
    "no-irregular-whitespace": 2,
    "no-iterator": 0,
    "no-label-var": 2,
    "no-labels": 2,
    "no-lone-blocks": 2,
    "no-lonely-if": 2,
    "no-loop-func": 0,
    "no-magic-numbers": 0,
    "no-mixed-operators": [1, {"allowSamePrecedence": true}],
    "no-mixed-requires": 2,
    "no-mixed-spaces-and-tabs": 2,
    "no-multi-spaces": 2,
    "no-multi-str": 2,
    "no-multiple-empty-lines": 2,
    "no-native-reassign": 2,
    "no-negated-condition": 0,
    "no-negated-in-lhs": 2,
    "no-nested-ternary": 0,
    "no-new": 0,
    "no-new-func": 0,
    "no-new-object": 2,
    "no-new-require": 2,
    "no-new-symbol": 0,
    "no-new-wrappers": 0,
    "no-obj-calls": 0,
    "no-octal": 0,
    "no-octal-escape": 0,
    "no-param-reassign": 0,
    "no-path-concat": 0,
    "no-plusplus": 0,
    "no-process-env": 0,
    "no-process-exit": 0,
    "no-proto": 0,
    "no-prototype-builtins": 0,
    "no-redeclare": 2,
    "no-regex-spaces": 0,
    "no-restricted-globals": 2,
    "no-restricted-imports": 2,
    "no-restricted-modules": 2,
    "no-restricted-properties": 2,
    "no-restricted-syntax": 2,
    "no-return-assign": 0,
    "no-script-url": 0,
    "no-self-assign": 0,
    "no-self-compare": 0,
    "no-sequences": 0,
    "no-shadow": 2,
    "no-shadow-restricted-names": 2,
    "no-spaced-func": 2,
    "no-sparse-arrays": 2,
    "no-sync": 0,
    "no-tabs": 0,
    "no-template-curly-in-string": 0,
    "no-ternary": 0,
    "no-this-before-super": 2,
    "no-throw-literal": 2,
    "no-trailing-spaces": 2,
    "no-undef": 0,
    "no-undef-init": 0,
    "no-undefined": 0,
    "no-underscore-dangle": 0,
    "no-unexpected-multiline": 0,
    "no-unmodified-loop-condition": 0,
    "no-unneeded-ternary": 2,
    "no-unreachable": 2,
    "no-unsafe-finally": 1,
    "no-unsafe-negation": 2,
    "no-unused-expressions": 2,
    "no-unused-labels": 2,
    "no-unused-vars": [2, { "args": "after-used" }],
    "no-use-before-define": 2,
    "no-useless-call": 2,
    "no-useless-computed-key": 2,
    "no-useless-concat": 2,
    "no-useless-constructor": 1,
    "no-useless-escape": 2,
    "no-useless-rename": 2,
    "no-var": 2,
    "no-void": 2,
    "no-warning-comments": 2,
    "no-whitespace-before-property": 2,
    "no-with": 2,
    "no-wrap-func": 0,
    "object-curly-newline": 0,
    "object-curly-spacing": [2, "always"],
    "object-property-newline": 0,
    "object-shorthand": 0,
    "one-var": 0,
    "one-var-declaration-per-line": 0,
    "operator-assignment": 1,
    "operator-linebreak": ["error", "after"],
    "padded-blocks": ["error", "never"],
    "prefer-arrow-callback": 2,
    "prefer-const": 2,
    "prefer-numeric-literals": 2,
    "prefer-reflect": 0,
    "prefer-rest-params": 2,
    "prefer-spread": 2,
    "prefer-template": 1,
    "quote-props": 0,
    "quotes": 0,
    "radix": 0,
    "react/display-name": 0,
    "react/forbid-component-props": 0,
    "react/forbid-prop-types": 0,
    "react/jsx-boolean-value": 0,
    "react/jsx-closing-bracket-location": 0,
    "react/jsx-curly-spacing": 0,
    "react/jsx-equals-spacing": 0,
    "react/jsx-filename-extension": 0,
    "react/jsx-first-prop-new-line": 0,
    "react/jsx-handler-names": 0,
    "react/jsx-indent": [2, 2],
    "react/jsx-indent-props": [1, 2],
    "react/jsx-key": 0,
    "react/jsx-max-props-per-line": 0,
    "react/jsx-no-bind": 0,
    "react/jsx-no-comment-textnodes": 0,
    "react/jsx-no-duplicate-props": 2,
    "react/jsx-no-literals": 0,
    "react/jsx-no-target-blank": 0,
    "react/jsx-no-undef": 0,
    "react/jsx-pascal-case": 0,
    "react/jsx-sort-props": 2,
    "react/jsx-space-before-closing": 2,
    "react/jsx-uses-react": 2,
    "react/jsx-uses-vars": 2,
    "react/jsx-wrap-multilines": 0,
    "react/no-comment-textnodes": 0,
    "react/no-danger": 0,
    "react/no-danger-with-children": 0,
    "react/no-deprecated": 0,
    "react/no-did-mount-set-state": 0,
    "react/no-did-update-set-state": 0,
    "react/no-direct-mutation-state": 0,
    "react/no-find-dom-node": 2,
    "react/no-is-mounted": 2,
    "react/no-multi-comp": [
      2,
      { "ignoreStateless": true }
    ],
    "react/no-render-return-value": 2,
    "react/no-set-state": 1,
    "react/no-string-refs": 0,
    "react/no-unknown-property": 0,
    "react/no-unused-prop-types": [1, {skipShapeProps: true}],
    "react/prefer-es6-class": 2,
    "react/prefer-stateless-function": 1,
    "react/prop-types": 2,
    "react/react-in-jsx-scope": 0,
    "react/require-extension": 0,
    "react/require-optimization": 0,
    "react/require-render-return": 0,
    "react/self-closing-comp": 2,
    "react/sort-comp": 2,
    "react/sort-prop-types": [
      2, {
      "callbacksLast": false,
      "ignoreCase": true,
      "requiredFirst": false,
    }],
    "react/style-prop-object": 0,
    "react/wrap-multilines": 0,
    "require-jsdoc": 1,
    "require-yield": 0,
    "rest-spread-spacing": 0,
    "semi": 2,
    "semi-spacing": 2,
    "sort-imports": 0,
    "sort-keys": [2, "asc", {"caseSensitive": false, "natural": true}],
    "sort-vars": [2, { "ignoreCase": true }],
    "space-before-blocks": 2,
    "space-before-function-paren": ["error", "always"],
    "space-in-parens": 2,
    "space-infix-ops": 2,
    "space-unary-ops": 2,
    "spaced-comment": [2, "always", { "block": { "balanced": true } }],
    "strict": 2,
    "symbol-description": 0,
    "template-curly-spacing": 0,
    "unicode-bom": 0,
    "use-isnan": 0,
    "valid-jsdoc": 1,
    "valid-typeof": 1,
    "vars-on-top": 0,
    "wrap-iife": 0,
    "wrap-regex": 0,
    "yield-star-spacing": 0,
    "yoda": 0
  }
}
