#include </opt/homebrew/Cellar/sdl2/2.30.4/include/SDL2/SDL.h>
#include <chrono>
#include <iostream>
#include <random>
#include <ranges>
#include <algorithm>
#include <thread>
#include <vector>


// I want to make a function that I can call that initializes an sdl window
//this is pass by reference
bool initSDL(SDL_Window*& window, SDL_Renderer*& renderer) {

  if(SDL_Init(SDL_INIT_VIDEO) < 0) {
    std::cerr << "Initialization failed";
    return false;
  }

  if (SDL_CreateWindowAndRenderer(1920, 1080, 0, &window, &renderer) < 0) {
        std::cerr << "Window creation failed: " << SDL_GetError() << "\n";
        return false;
    }

  if (renderer == nullptr) std::cerr << "Renderer not created: " << SDL_GetError();
  if (window == nullptr) std::cerr << "Window not created: " << SDL_GetError();

  return true;
}

std::vector<int> create_vector(int size) {
  std::random_device rd;
  std::mt19937 gen(rd());
  std::vector<int> ret_vec(size);
  std::uniform_int_distribution<> dist(1, 100);
  for (int i = 0; i < size; i++) {
    ret_vec[i] = dist(gen);
  }
  return ret_vec;
}

void draw_state(SDL_Renderer*& renderer, std::vector<int> vector) {

  SDL_SetRenderDrawColor(renderer, 0,0,0,255);
  SDL_RenderClear(renderer);

  int bar_width = 1920 / vector.size();
  for (int i = 0; i < vector.size(); i++) {
    int bar_height = (vector[i] * 1080) / vector.size();
    SDL_Rect bar = {i * bar_width, 1080 - bar_height, bar_width, bar_height};
    SDL_SetRenderDrawColor(renderer, 255,0,0, 255);
    SDL_RenderFillRect(renderer, &bar);
  }

  SDL_RenderPresent(renderer);

}


int main (int argc, char *argv[]) {

  SDL_Window* window = nullptr;
  SDL_Renderer* renderer = nullptr;

  if (initSDL(window, renderer)) {

    std::vector<int> vector = create_vector(100);

    for (int i = 0; i < 100; i++) {
      for (int j = i; j < 100; j++) {
        if (vector[i] > vector[j]) {
          int tmp = vector[i];
          vector[i] = vector[j];
          vector[j] = tmp;
          draw_state(renderer, vector);
          // std::this_thread::sleep_for(std::chrono::milliseconds(10));
        }
      }
    }

    bool quit = false;
    SDL_Event event;

    while (!quit) {
      while (SDL_PollEvent(&event)) {
        quit = event.type == SDL_QUIT ? true : false;
      }
    }

    SDL_DestroyRenderer(renderer);
    SDL_DestroyWindow(window);

  }

  SDL_Quit();
  return 0;
}
