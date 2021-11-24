import crud from '../../../core/crud'

crud.routes['menu'] = {
  url: 'crud/menu',
  method: 'get',
  resultType: 'list',
  protocol: 'record'
}

crud.routes['csv-exporta'] = {
  url: 'foormaction/csv-export/{foorm}/{foormtype}', // {foormpk?}',
  method: 'post',
  resultType: 'record'
}

crud.routes['pdf-exporta'] = {
  url: 'foormaction/pdf-export/{foorm}/{foormtype}', // {foormpk?}',
  method: 'post',
  resultType: 'record'
}

crud.routes['multi-delete'].url = '/foormaction/multi-delete/{modelName}/list'
crud.routes['uploadfile'].url = '/foormaction/uploadfile/{modelName}/edit'

crud.routes.set.url = '/foormaction/set/{modelName}/list'

crud.routes['autocomplete'].url = '/foormaction/autocomplete/{foormName}/{viewType}'
crud.routes['autocomplete'].method = 'post'

crud.routes['list-constraint'] = {
  url: '/foormc/{modelName}/{constraintKey}/{constraintValue}',
  resultType: 'list',
  protocol: 'list',
  method: 'get'
}

crud.routes['edit-constraint'] = {
  url: '/foormc/{modelName}/{pk}/edit/{constraintKey}/{constraintValue}',
  resultType: 'record',
  protocol: 'record',
  method: 'get'
}

crud.routes['insert-constraint'] = {
  url: '/foormc/{modelName}/new/{constraintKey}/{constraintValue}',
  resultType: 'record',
  protocol: 'record',
  method: 'get'
}

crud.routes['wizard'] = {
  url: '/test-passo/{passo}',
  method: 'get',
  type: 'record',
  protocol: 'record'
}
