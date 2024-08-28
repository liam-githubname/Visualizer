#include </opt/homebrew/Cellar/sdl2/2.30.4/include/SDL2/SDL.h>
#include <chrono>
#include <iostream>
#include <random>
#include <ranges>
#include <algorithm>
#include <thread>
#include <vector>

bool initSDL(SDL_Window*& window, SDL_Renderer*& renderer) {
    if(SDL_Init(SDL_INIT_VIDEO) < 0) {
        std::cerr << "Initialization failed: " << SDL_GetError() << "\n";
        return false;
    }
    if (SDL_CreateWindowAndRenderer(1920, 1080, 0, &window, &renderer) < 0) {
        std::cerr << "Window creation failed: " << SDL_GetError() << "\n";
        return false;
    }
    if (renderer == nullptr) std::cerr << "Renderer not created: " << SDL_GetError() << "\n";
    if (window == nullptr) std::cerr << "Window not created: " << SDL_GetError() << "\n";
    return true;
}

std::vector<int> create_vector(int size) {
    std::random_device rd;
    std::mt19937 gen(rd());
    std::vector<int> ret_vec(size);
    std::uniform_int_distribution<> dist(1, size);  // Changed to use 'size' as max value
    std::generate(ret_vec.begin(), ret_vec.end(), [&]() { return dist(gen); });
    return ret_vec;
}

//const is used so the vector is unmutable in the function, and the & is added so that the vector is passed by reference and doesn't have to be copied every time the function is called
void draw_state(SDL_Renderer* renderer, const std::vector<int>& vector) {
    SDL_SetRenderDrawColor(renderer, 0, 0, 0, 255);
    SDL_RenderClear(renderer);
    int bar_width = 1920 / vector.size();
    for (int i = 0; i < vector.size(); i++) {
        int bar_height = (vector[i] * 1080) / vector.size();
        SDL_Rect bar = {i * bar_width, 1080 - bar_height, bar_width, bar_height};
        SDL_SetRenderDrawColor(renderer, 255, 0, 0, 255);
        SDL_RenderFillRect(renderer, &bar);
    }
    SDL_RenderPresent(renderer);
}

void bubble_sort(std::vector<int>& vector, SDL_Renderer* renderer) {
    for (int i = 0; i < vector.size() - 1; i++) {
        for (int j = 0; j < vector.size() - i - 1; j++) {
            if (vector[j] > vector[j + 1]) {
                std::swap(vector[j], vector[j + 1]);
                draw_state(renderer, vector);
                SDL_Delay(1);  // Short delay to make the visualization visible

                SDL_Event event;
                while (SDL_PollEvent(&event)) {
                    if (event.type == SDL_QUIT) {
                        return;  // Exit the function if the window is closed
                    }
                }
            }
        }
    }
}

int main(int argc, char *argv[]) {
    SDL_Window* window = nullptr;
    SDL_Renderer* renderer = nullptr;
    if (initSDL(window, renderer)) {
        std::vector<int> vector = create_vector(100);
        draw_state(renderer, vector);  // Draw initial state
        SDL_Delay(1000);  // Pause to show initial state

        bubble_sort(vector, renderer);

        bool quit = false;
        SDL_Event event;
        while (!quit) {
            while (SDL_PollEvent(&event)) {
                quit = event.type == SDL_QUIT;
            }
        }
        SDL_DestroyRenderer(renderer);
        SDL_DestroyWindow(window);
    }
    SDL_Quit();
    return 0;
}
