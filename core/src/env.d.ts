// The consumer's bundler replaces `process.env.NODE_ENV`; declared here so
// the library doesn't need @types/node.
declare const process: { env: { NODE_ENV?: string } }
