<template>
  <div class="container">
    <div>
      <contacts v-if="searchType === 'contacts'"></contacts>
      <tags v-if="searchType === 'tags'"></tags>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import contactsResults from './contacts-results'
import tagsResults from './tags-results'

export default {
  name: 'search-results',
  components: {
    'contacts': contactsResults,
    'tags': tagsResults
  },
  computed: {
    ...mapGetters({
      searchType: 'getSearchType'
    })
  }
}
</script>
<style>
  .br20 {
    border-radius: 20px
  }
</style>
