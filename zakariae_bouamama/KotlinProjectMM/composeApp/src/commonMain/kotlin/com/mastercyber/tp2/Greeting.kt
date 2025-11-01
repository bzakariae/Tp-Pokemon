package com.mastercyber.tp2


import androidx.compose.ui.graphics.ImageBitmap


import io.ktor.client.*
import io.ktor.client.call.*
import io.ktor.client.plugins.contentnegotiation.*
import io.ktor.client.request.*
import io.ktor.serialization.kotlinx.json.*
import kotlinx.serialization.json.Json

import io.ktor.client.call.body
import io.ktor.client.request.get


import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext



val client = HttpClient {
    install(ContentNegotiation) {
        json(Json {
            prettyPrint = true
            isLenient = true
            ignoreUnknownKeys = true
        })
    }
}


suspend fun fetchPokemon(): PokemonResult {
    val random = (1..1025).random()
    val response: Pokemon =
        client.get("https://tyradex.vercel.app/api/v1/pokemon/$random").body()



    return PokemonResult(
        name = response.name?.fr ?: "Unknown",
        imageUrl = response.sprites?.regular ?: ""
    )
}


class Greeting {
    private val platform = getPlatform()

    fun greet(): String {
        return "Hello, ${platform.name}!"
    }
}
