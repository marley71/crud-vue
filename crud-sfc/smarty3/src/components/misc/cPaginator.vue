<template>
  <div v-if="last_page">
    <nav aria-label="pagination">
      <ul class="pagination pagination-pill justify-content-start mb-0">
        <li v-if="(parseInt(current_page) > 1)" class="page-item"> <!-- disabled -->
          <a class="page-link" href="javascript:void(0)" tabindex="-1" v-on:click="firstPage()">&laquo;</a>
        </li>
        <li v-if="(current_page - 2) > 0 " class="page-item">
          <a v-on:click="setPage(current_page - 2)" class="page-link" href="javascript:void(0)">
            {{ current_page - 2 }}
          </a>
        </li>
        <li v-if="(current_page - 1) > 0 " class="page-item">
          <a v-on:click="setPage(current_page - 1)" class="page-link" href="javascript:void(0)">
            {{ current_page - 1 }}
          </a>
        </li>
        <li class="page-item"><a class="page-link">
          pag. {{ current_page }} / {{ last_page }}
        </a></li>
        <li v-if="(current_page + 1) <=  last_page " class="page-item">
          <a v-on:click="setPage(current_page + 1)" class="page-link" href="javascript:void(0)">
            {{ current_page + 1 }}
          </a>
        </li>
        <li v-if="(current_page + 2) <=  last_page " class="page-item">
          <a v-on:click="setPage(current_page + 2)" class="page-link" href="javascript:void(0)">
            {{ current_page + 2 }}
          </a>
        </li>
        <li v-if="(parseInt(current_page) < last_page)" class="page-item">
          <a class="page-link" href="javascript:void(0)" v-on:click="lastPage()">&raquo;</a>
        </li>
      </ul>
      <div class="justify-content-start text-left pl-3">
        <small class="">({{ from + '-' + to + " di " + total }} elementi)</small>
      </div>
    </nav>
  </div>
</template>

<script>
import cComponent from './cComponent'
// import crud from '../../../../core/crud'
import cPaginatorMixin from '../../../../core/mixins/components/misc/cPaginatorMixin'

export default {
  name: 'c-paginator',
  extends: cComponent,
  mixins: [cPaginatorMixin]
}

</script>

<style scoped>

</style>
