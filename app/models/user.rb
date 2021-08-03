class User < ApplicationRecord
    has_many :posts, dependent: :destroy
    
    has_many :comments, dependent: :destroy
    has_many :comment_posts, through: :comments, source: :post

    has_many :likes, dependent: :destroy
    has_many :like_posts, through: :likes, source: :post
    
    has_secure_password

    validates :name, :password, presence: true
    validates :username, presence: true, uniqueness: true
    validates :password, length: { minimum: 5 }
end
