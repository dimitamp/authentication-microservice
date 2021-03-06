define({ "api": [
  {
    "type": "post",
    "url": "/users/authenticate",
    "title": "Authenticates a user",
    "name": "AuthenticateUser",
    "version": "1.0.0",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Required email</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "size": "8..",
            "optional": false,
            "field": "password",
            "description": "<p>Required password</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-example: ",
          "content": "{\n   \"email\": \"test@email.com\", \n   \"password\": \"01234567\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Authorization token.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "user",
            "description": "<p>User information.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user.email",
            "description": "<p>User's email.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user.role",
            "description": "<p>User' role.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user.id",
            "description": "<p>User's id.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  user: {\n      \"id\": \"5d0bd41c2b85baa50300002d\",\n      \"email\": \"test@email.com\",\n      \"role\": \"role1\"\n  },\n  token: \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNWQwYmQ0MWMyYjg1YmFhNTAzMDAw\n          MDJkIiwiZW1haWwiOiJmb25pa2hteWdhQGdtYWlsLmNvbSIsImlhdCI6MTU2MjEwMjc4N30.I64zY_Fj-\n          D30vttEDMaQBPaheuTLGX1F1Ap5pynpOBs\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UserDoesntExist",
            "description": "<p>User not found.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InvalidCredentials",
            "description": "<p>Password doesn't match with given e-mail.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "EmailNotVerified",
            "description": "<p>User e-mail is not verified.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "MissingEmail",
            "description": "<p>Missing required parameter e-mail.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InvalidEmail",
            "description": "<p>Invalid required parameter e-mail.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "MissingPassword",
            "description": "<p>Missing required parameter password.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InvalidPassword",
            "description": "<p>Invalid required parameter password.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Authentication error\n{\n  \"status\": 401\n  \"message\": \"Authentication Error: User not found.\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Authentication error\n{\n  \"status\": 401\n  \"message\": \"Authentication Error: Password doesn't match with given e-mail.\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Resource error\n{\n  \"status\": 401\n  \"message\": \"Authentication Error: E-mail not verified.\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"status\": 400\n  \"message\": \"Validation Error: E-mail is required.\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"status\": 400\n  \"message\": \"Validation Error: E-mail is invalid.\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"status\": 400\n  \"message\": \"Validation Error: Password is required.\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"status\": 400\n  \"message\": \"Validation Error: Password must have at least 8 characters.\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/users.js",
    "groupTitle": "User"
  },
  {
    "type": "delete",
    "url": "/users/:id",
    "title": "Deletes a User",
    "name": "DeleteUser",
    "group": "User",
    "version": "1.0.0",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Authorization token</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"Authorization\": \"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNWQwYmQ0MWMyYjg1YmFhNTAzMDAw\n          MDJkIiwiZW1haWwiOiJmb25pa2hteWdhQGdtYWlsLmNvbSIsImlhdCI6MTU2MjEwMjc4N30.I64zY_Fj-\n          D30vttEDMaQBPaheuTLGX1F1Ap5pynpOBs\"\n}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>User's unique id</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  ok: true\n  message: \"User deleted\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/users.js",
    "groupTitle": "User",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "TokenMissing",
            "description": "<p>No authorization token was provided.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InvalidToken",
            "description": "<p>Failed to verify token.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InsufficientPrivileges",
            "description": "<p>Parameter id doesnt match decoded token's id.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UserDoesntExist",
            "description": "<p>User doesn't exist.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Authorization Error\n{\n  \"status\": 403\n  \"message\": \"Authorization Error: token missing.\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Authorization Error\n{\n  \"status\": 403\n  \"message\": \"Authorization Error: Failed to verify token.\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Authorization Error\n{\n  \"status\": 403\n  \"message\": \"Authorization Error: Insufficient privileges.\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Resource not found\n{\n  \"status\": 404\n  \"message\": \"Resource Error: User not found.\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "post",
    "url": "/users/create",
    "title": "Creates a new User",
    "name": "PostUser",
    "group": "User",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Required email</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "size": "8..",
            "optional": false,
            "field": "password",
            "description": "<p>Required password</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "allowedValues": [
              "\"role1\"",
              "\"role2\"",
              "\"role3\""
            ],
            "optional": false,
            "field": "role",
            "description": "<p>Required role</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-example: ",
          "content": "{\n   \"email\": \"test@email.com\", \n   \"password\": \"01234567\",\n   \"role\": \"role1\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Authorization token.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "user",
            "description": "<p>User information.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user.email",
            "description": "<p>User's email.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user.role",
            "description": "<p>User' role.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user.id",
            "description": "<p>User's id.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  user: {\n      \"id\": \"5d0bd41c2b85baa50300002d\",\n      \"email\": \"test@email.com\",\n      \"role\": \"role1\"\n  },\n  token: \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNWQwYmQ0MWMyYjg1YmFhNTAzMDAw\n          MDJkIiwiZW1haWwiOiJmb25pa2hteWdhQGdtYWlsLmNvbSIsImlhdCI6MTU2MjEwMjc4N30.I64zY_Fj-\n          D30vttEDMaQBPaheuTLGX1F1Ap5pynpOBs\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UserAlreadyExists",
            "description": "<p>User already exists.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "MissingEmail",
            "description": "<p>Missing required parameter e-mail.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InvalidEmail",
            "description": "<p>Invalid required parameter e-mail.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "MissingPassword",
            "description": "<p>Missing required parameter password.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InvalidPassword",
            "description": "<p>Invalid required parameter password.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "MissingRole",
            "description": "<p>Missing required parameter role.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InvalidRole",
            "description": "<p>Invalid required parameter role.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 409 Resource Conflict\n{\n  \"status\": 409\n  \"message\": \"Registration Error: User already exists.\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"status\": 400\n  \"message\": \"Validation Error: E-mail is required.\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"status\": 400\n  \"message\": \"Validation Error: E-mail is invalid.\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"status\": 400\n  \"message\": \"Validation Error: Password is required.\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"status\": 400\n  \"message\": \"Validation Error: Password must have at least 8 characters.\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"status\": 400\n  \"message\": \"Validation Error: Role is required.\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"status\": 400\n  \"message\": \"Validation Error: Role must role must be one of the following values: user\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/users.js",
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "/users/changepassword",
    "title": "Changes a user's password",
    "name": "RequestChange",
    "group": "User",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>User's new password</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n ok: true,\n message: \"Password was changed\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ExpiredToken",
            "description": "<p>Reset token has expired.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "MissingPassword",
            "description": "<p>Missing required parameter password.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InvalidPassword",
            "description": "<p>Invalid required parameter password.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UserDoesntExist",
            "description": "<p>User doesn't exist.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Resource error\n{\n  \"status\": 410\n  \"message\": \"Resource Error: Reset token has expired.\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"status\": 400\n  \"message\": \"Validation Error: Password is required.\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"status\": 400\n  \"message\": \"Validation Error: Password must have at least 8 characters.\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Resource not found\n{\n  \"status\": 404\n  \"message\": \"Resource Error: User not found.\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/users.js",
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "/users/resetpassword",
    "title": "Creates a password reset token for a user",
    "name": "RequestReset",
    "group": "User",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>User's email</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n token: \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNWQwYmQ0MWMyYjg1YmFhNTAzMDAw\n          MDJkIiwiZW1haWwiOiJmb25pa2hteWdhQGdtYWlsLmNvbSIsImlhdCI6MTU2MjEwMjc4N30.I64zY_Fj-\n          D30vttEDMaQBPaheuTLGX1F1Ap5pynpOBs\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/users.js",
    "groupTitle": "User",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "MissingEmail",
            "description": "<p>Missing required parameter e-mail.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InvalidEmail",
            "description": "<p>Invalid required parameter e-mail.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UserDoesntExist",
            "description": "<p>User doesn't exist.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"status\": 400\n  \"message\": \"Validation Error: E-mail is required.\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"status\": 400\n  \"message\": \"Validation Error: E-mail is invalid.\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Resource not found\n{\n  \"status\": 404\n  \"message\": \"Resource Error: User not found.\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "patch",
    "url": "/users/:id",
    "title": "Updates a User",
    "name": "UpdateUser",
    "group": "User",
    "version": "1.0.0",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Authorization token</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"Authorization\": \"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNWQwYmQ0MWMyYjg1YmFhNTAzMDAw\n          MDJkIiwiZW1haWwiOiJmb25pa2hteWdhQGdtYWlsLmNvbSIsImlhdCI6MTU2MjEwMjc4N30.I64zY_Fj-\n          D30vttEDMaQBPaheuTLGX1F1Ap5pynpOBs\"\n}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>User's unique id</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "email",
            "description": "<p>Optional email</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "size": "8..",
            "optional": true,
            "field": "password",
            "description": "<p>Optional password</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "allowedValues": [
              "\"role1\"",
              "\"role2\"",
              "\"role3\""
            ],
            "optional": true,
            "field": "role",
            "description": "<p>Optional role</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  ok: true\n  message: \"User updated\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/users.js",
    "groupTitle": "User",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "TokenMissing",
            "description": "<p>No authorization token was provided.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InvalidToken",
            "description": "<p>Failed to verify token.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InsufficientPrivileges",
            "description": "<p>Parameter id doesnt match decoded token's id.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UserDoesntExist",
            "description": "<p>User doesn't exist.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InvalidEmail",
            "description": "<p>Invalid required parameter e-mail.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InvalidPassword",
            "description": "<p>Invalid required parameter password.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InvalidRole",
            "description": "<p>Invalid required parameter role.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "MissingParameters",
            "description": "<p>Missing required parameters.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Authorization Error\n{\n  \"status\": 403\n  \"message\": \"Authorization Error: token missing.\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Authorization Error\n{\n  \"status\": 403\n  \"message\": \"Authorization Error: Failed to verify token.\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Authorization Error\n{\n  \"status\": 403\n  \"message\": \"Authorization Error: Insufficient privileges.\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Resource not found\n{\n  \"status\": 404\n  \"message\": \"Resource Error: User not found.\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"status\": 400\n  \"message\": \"Validation Error: E-mail is invalid.\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"status\": 400\n  \"message\": \"Validation Error: Password must have at least 8 characters.\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"status\": 400\n  \"message\": \"Validation Error: Role must role must be one of the following values: user\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"status\": 400\n  \"message\": \"Validation Error: Missing Parameters\"\n}",
          "type": "json"
        }
      ]
    }
  }
] });
