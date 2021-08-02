class Post < ApplicationRecord
  belongs_to :user
  belongs_to :song
  has_many :likes, dependent: :destroy
  has_many :comments, dependent: :destroy

  # add validation so that user cannot post same song twice

  def num_likes
    self.likes.count
  end
end
