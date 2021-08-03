Rails.application.routes.draw do
  
  resources :posts, only: [:index, :create, :destroy]
  resources :likes, only: [:create, :destroy, :index]
  resources :comments, only: [:create, :destroy, :index]
  resources :songs, only: [:index, :show, :create, :destroy]
  resources :users, only: [:index, :create, :destroy, :show]
  get "/users/:id/posts", to: "users#user_posts"

  post "/new_post", to: "posts#new_post" 

  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
