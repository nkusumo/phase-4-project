Rails.application.routes.draw do
  
  resources :likes, only: [:create, :destroy, :index]
  resources :comments, only: [:create, :destroy, :index]
  resources :songs, only: [:index, :create, :destroy]
  resources :users, only: [:index, :create, :destroy, :show]
  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
