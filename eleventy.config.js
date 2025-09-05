module.exports = function(eleventyConfig) {
  // Copy static assets (CSS, images) to output
  eleventyConfig.addPassthroughCopy("assets");
  // Define collections for projects and blog
  eleventyConfig.addCollection("projects", function(collectionApi) {
    return collectionApi.getFilteredByGlob("projects/*.md");
  });
  eleventyConfig.addCollection("blog", function(collectionApi) {
    return collectionApi.getFilteredByGlob("blog/*.md");
  });
  return {
    dir: {
      input: ".", // Source files in root
      output: "dist" // Output static files to dist/
    }
  };
};