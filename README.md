# Aplicativo de casos de Covid-19 no mundo

Este projeto foi criado com o intuito de treinar minhas habilidades com react-native, expo e node.js

## Fonte de dados
- Os dados são buscados através de uma api da WHO (Organização Mundial da Saúde) com a ajuda do https://rapidapi.com
https://rapidapi.com/pillious/api/WHO%20Covid-19%20data

- As bandeiras são encontradas através de uma API que utiliza o código alphanumérico de dois caracteres do pais para buscar a imagem
Ex.: http://www.geognos.com/api/en/countries/flag/BR.png

## Screenshots
<img src="https://user-images.githubusercontent.com/19805404/79092541-99750100-7d27-11ea-9a11-f6197539b692.jpeg" width="200">
<img src="https://user-images.githubusercontent.com/19805404/79092544-9a0d9780-7d27-11ea-82c4-dde93c4ec4c4.jpeg" width="200">

## Bibilhotecas utilizadas
- **i18n-iso-countries** - a API da WHO não retorna o código do pais, e nem o nome em português, utilizei essa biblioteca para encontrar tanto o código alphanumérico de dois digitos quanto para encontrar a tradução em português do Brasil ou Portugal
- **fast-sort** - ordernar os dados retornados da api do WHO em ordem alfabética
- **axios** - fazer comunicação com a API da WHO
- **moment** - manipular os dados de data e hora de forma mais fácil
