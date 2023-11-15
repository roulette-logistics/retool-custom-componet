custom component hidden lgic

```
{{!schema_dropdown.value || !datasource_dropdown.value || query_builder__fetch_columns?.data?.data?.columns?.length == 0 || query_builder__fetch_columns?.data == null || query_builder__fetch_columns.data.code != '200'}}

```


query builder error message hidden condition
```
{{ query_builder__fetch_columns.data.code == 200 || !query_builder_custom_component.hidden}}
```