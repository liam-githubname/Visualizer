#include <iostream>
#include </opt/homebrew/Cellar/sdl2/2.30.4/include/SDL2/SDL.h>

int main(int argc, char *argv[]) {
    if (SDL_Init(SDL_INIT_VIDEO)) {
        std::cerr << "Initialization failed: " << SDL_GetError() << "\n";
        return 1;
    }

    SDL_Window* window = nullptr;
    SDL_Renderer* renderer = nullptr;

    if (SDL_CreateWindowAndRenderer(1920, 1080, 0, &window, &renderer)) {
        std::cerr << "Window creation failed: " << SDL_GetError() << "\n";
        SDL_Quit();
        return 1;
    }


    SDL_SetRenderDrawColor(renderer, 0, 0, 0, 255);
    SDL_RenderClear(renderer);
    SDL_SetRenderDrawColor(renderer, 255, 255, 255, 255);

    // Draw a horizontal line
    SDL_RenderDrawLine(renderer, 100, 540, 1820, 540);

    // Draw a vertical line
    SDL_RenderDrawLine(renderer, 960, 100, 960, 980);

    SDL_RenderPresent(renderer);

    bool quit = false;
    SDL_Event event;

    while (!quit) {
        while (SDL_PollEvent(&event)) {
            quit = event.type == SDL_QUIT ? true : false;

            if (event.type == SDL_KEYDOWN) {

            }
        }
    }

    SDL_DestroyRenderer(renderer);
    SDL_DestroyWindow(window);
    SDL_Quit();

    return 0;
}
