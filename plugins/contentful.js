import { createClient } from "contentful";

class ContentfulAdapter {
  constructor() {
    this.limitNum = 10;

    this.client = createClient({
      space: process.env.NUXT_ENV_CTF_SPACE_ID,
      accessToken: process.env.NUXT_ENV_CTF_ACCESS_TOKEN
    });
  }

  getTop(){
    return this.client.getEntry('4OnpxVgQFBiX8lgvVGfyL4');
  }

  getAboutMe(){
    return this.client.getEntry('1FrXSeuQRry6jFapXaZZcv');
  }

  getSocialLinks(){
    return this.client.getEntries({
      'content_type': 'socialLink'
    })
  }

  getPaginatedBlogs(page=1){
    return this.client.getEntries({
      'content_type': 'blog',
      'order': '-fields.publishedAt',
      limit: this.limitNum,
      skip: (page -1) * this.limitNum,
    })
  }

  getAllBlogs(){
    return this.client.getEntries({
      'content_type': 'blog',
      'order': '-fields.publishedAt',
    })
  }

  getAllTags(){
    return this.client.getEntries({
      'content_type': 'tag',
      'order': 'sys.createdAt',
    })
  }

  getTagByEnName(enName){
    return this.client.getEntries({
      'content_type': 'tag',
      "fields.enName": enName
    })
  }

  getPaginatedBlogsByTagId(id, page=1){
    return this.client.getEntries({
      content_type: "blog",
      "fields.tags.sys.id": id,
      'order': '-fields.publishedAt',
      limit: this.limitNum,
      skip: (page -1) * this.limitNum,
    })
  }

  getBlogsByTagId(id){
    return this.client.getEntries({
      content_type: "blog",
      "fields.tags.sys.id": id,
    })
  }

  getEntryById(id){
    return this.client.getEntry(id);
  }

  getLastPage(total){
    if( (total % this.limitNum) === 0){
      return Math.floor(total / this.limitNum)
    }
    return Math.floor(total / this.limitNum) + 1
 }

}

export default new ContentfulAdapter();