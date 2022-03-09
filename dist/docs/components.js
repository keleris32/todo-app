module.exports = {
  components: {
    schemas: {
      // id model
      id: {
        type: 'string', // data type
        description: 'An id of a todo', // desc
        example: 'e7bde54c-2964-49d3-b174-a50eb336c04e', // example of an id
      },
      // todo model
      Todo: {
        type: 'object', // data type
        properties: {
          id: {
            type: 'string', // data-type
            description: 'Todo identification number', // desc
            example: 'e7bde54c-2964-49d3-b174-a50eb336c04e', // example of an id
          },
          description: {
            type: 'string', // data-type
            description: "Todo's task", // desc
            example: 'Brush your teeth', // example of a title
          },
          completed: {
            type: 'boolean', // data type
            description: 'The status of the todo', // desc
            example: false, // example of a completed value
          },
        },
      },
      // Todo input model
      TodoInput: {
        type: 'object', // data type
        properties: {
          description: {
            type: 'string', // data type
            description: "Todo's task", // desc
            example: 'Brush your teeth', // example of a title
          },
        },
      },
      // error model
      Error: {
        type: 'object', // data type
        properties: {
          success: {
            type: 'boolean', // data type
            description: 'Status of request', //desc
            example: 'false', // example of error's status
          },
          message: {
            type: 'string', // data type
            description: 'Error message', // desc
            example: 'Provide valid credentials!', // example of an error message
          },
          data: {
            type: 'null', // data type
            description: 'Data returned from server', // desc
            example: 'null', // example of an error internal code
          },
        },
      },
    },
  },
};
