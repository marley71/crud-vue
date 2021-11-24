<template>
    <div v-if="last_page" class="justify-center">
        <ul class="flex pagination pagination-pill justify-start mb-0">
            <li v-if="(parseInt(current_page) > 1)" class="paginator-item"> <!-- disabled -->
                <a class="" href="javascript:void(0)" tabindex="-1" v-on:click="firstPage()">&laquo;</a>
            </li>
            <li v-if="(current_page - 2) > 0 " class="paginator-item">
                <a v-on:click="setPage(current_page - 2)" class="" href="javascript:void(0)">
                    {{ current_page - 2 }}
                </a>
            </li>
            <li v-if="(current_page - 1) > 0 " class="paginator-item">
                <a v-on:click="setPage(current_page - 1)" class="" href="javascript:void(0)">
                    {{ current_page - 1 }}
                </a>
            </li>
            <li class="paginator-item hover:bg-transparent hover:text-gray-600"><a class="">
                pag. {{ current_page }} / {{ last_page }}
            </a></li>
            <li v-if="(current_page + 1) <=  last_page " class="paginator-item">
                <a v-on:click="setPage(current_page + 1)" class="" href="javascript:void(0)">
                    {{ current_page + 1 }}
                </a>
            </li>
            <li v-if="(current_page + 2) <=  last_page " class="paginator-item">
                <a v-on:click="setPage(current_page + 2)" class="" href="javascript:void(0)">
                    {{ current_page + 2 }}
                </a>
            </li>
            <li v-if="(parseInt(current_page) < last_page)" class="paginator-item">
                <a class="" href="javascript:void(0)" v-on:click="lastPage()">&raquo;</a>
            </li>
        </ul>
        <div class="text-center pl-3 text-xs">
            ({{ from + '-' + to + " di " + total }} elementi)
        </div>
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
