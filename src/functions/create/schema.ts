export default {
  type: "object",
  properties: {
    noteId: { type: 'string' }
  },
  required: ['noteId']
} as const;
