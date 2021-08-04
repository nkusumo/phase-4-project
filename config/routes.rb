Rails.application.routes.draw do
  
  resources :posts, only: [:index, :create, :destroy]
  resources :likes, only: [:create, :destroy, :index]
  resources :comments, only: [:create, :destroy, :index]
  resources :songs, only: [:index, :show, :create, :destroy]
  resources :users, only: [:index, :create, :destroy, :show]
  get "/users/:id/posts", to: "users#user_posts"

  post "/signup", to: "users#create"
  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"
  get "/current_user", to: "sessions#user"
  post "/new_post", to: "posts#new_post"
  get "/spotify_search/:search", to: "posts#spotify_search"

  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
