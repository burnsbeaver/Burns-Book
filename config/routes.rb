Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'auth'
  namespace :api do
    get 'books/resolve', to: 'books#resolve'
    get 'bets/findbets/:league', to: 'bets#findBets'
    resources :books
    resources :bets

  end
end
