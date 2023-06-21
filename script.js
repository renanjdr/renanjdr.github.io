async  function getPersonagens(){
    const data = await fetch('https://rickandmortyapi.com/api/character/1,2,3,4,5,6,7,8,9,10')
    const personagens = await data.json()
    const personagensTratados = personagens.map(personagem => {

        let personagemTmp = {
            "id": personagem.id,
            "name": personagem.name,
            "status": personagem.status, 
            "species": personagem.species, 
            "gender": personagem.gender, 
            "origin": personagem.origin.name,
            "location": personagem.location.name, 
            "image": personagem.image, 
            "episode": personagem.episode,
            "totalEpisodes" : personagem.episode.length 
        }


        return personagemTmp
    }
    )
    return personagensTratados

}

async function criaCards(){
    const container = document.getElementById('card-container')
    const personagens = await getPersonagens()

    personagens.forEach(element => {
        const card = document.createElement('div')
        card.classList.add('card')

        const image = document.createElement('img')
        image.src = element.image
        card.appendChild(image)
        
        const id = document.createElement('h3')
        id.innerHTML = "Id: " + element.id
        card.appendChild(id)

        const name = document.createElement('h2')
        name.innerHTML = element.name
        card.appendChild(name)

        const status = document.createElement('h3')
        status.innerHTML = "Status: " + element.status
        card.appendChild(status)

        const gender = document.createElement('h3')
        gender.innerHTML = "Gender: " + element.gender
        card.appendChild(gender)


        container.appendChild(card)
    })



}


async function criaTabela(){
    const container = document.getElementById('data-container')
    const personagens = await getPersonagens()

    personagens.forEach(element => {
        const row = document.createElement("tr")

        const name = document.createElement("td")
        name.innerHTML = element.name
        row.appendChild(name)

        const gender = document.createElement("td")
        gender.innerHTML = element.gender
        row.appendChild(gender)

        const totalEpisodes = document.createElement("td")
        totalEpisodes.innerHTML = element.totalEpisodes
        row.appendChild(totalEpisodes)

        var episodeList = ''
        var contador = 0
        while(contador < 5 && element.totalEpisodes > contador) {
            episodeList = episodeList + element.episode[contador] 
            contador = contador + 1
            if (contador != 5 && element.totalEpisodes != contador) {
                episodeList = episodeList + ', '
            }
        }


        const episodes = document.createElement("td")
        episodes.innerHTML = episodeList
        row.appendChild(episodes)
        
        if (element.totalEpisodes >= 7){
            var passou = 'Passed'
        } else {
            var passou = 'Failed'
        }

        const rule = document.createElement("td")
        rule.innerHTML = passou
        row.appendChild(rule)

        container.appendChild(row)

    })
}


criaCards()
criaTabela()

document.getElementById("registration-form").addEventListener('submit', function(element){
    element.preventDefault()
    const container = document.getElementById('data-container')

    const row = document.createElement('tr')

    const name_value = document.getElementById('Name').value
    const gender_value = document.getElementById('Gender').value
    const episode_value = document.getElementById('Episode').value


    const name = document.createElement("td")
    name.innerHTML = name_value
    row.appendChild(name)

    const gender = document.createElement("td")
    gender.innerHTML = gender_value
    row.appendChild(gender)

    const totalEpisodes = document.createElement("td")
    totalEpisodes.innerHTML = episode_value
    row.appendChild(totalEpisodes)

    const episodes = document.createElement("td")
    episodes.innerHTML = ''
    row.appendChild(episodes)
        
    if (Number(episode_value) >= 7){
        var passou = 'Passed'
    } else {
        var passou = 'Failed'
    }

    const rule = document.createElement("td")
    rule.innerHTML = passou
    row.appendChild(rule)

    container.appendChild(row)

    document.getElementById('Name').value = ''
    document.getElementById('Gender').value = ''
    document.getElementById('Episode').value = ''

})