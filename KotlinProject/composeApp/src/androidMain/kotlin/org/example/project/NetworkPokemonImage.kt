package org.example.project

import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import coil.compose.AsyncImage
import androidx.compose.foundation.layout.size


@Composable
actual fun NetworkPokemonImage(url: String?, name: String?) {
    if (!url.isNullOrEmpty()) {
        AsyncImage(
            model = url,
            contentDescription = name,
            modifier = Modifier.size(120.dp)
        )
    }
}
