class Song < ApplicationRecord
    has_many :comments, dependent: :destroy
    has_many :users, through: :comments

    has_many :likes, dependent: :destroy
    has_many :like_users, through: :likes
end
