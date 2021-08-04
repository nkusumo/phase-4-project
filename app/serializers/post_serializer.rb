class PostSerializer < ActiveModel::Serializer
  attributes :id, :username
  has_one :song
  has_many :comments
  has_many :likes

  def username
    self.object.user.username
  end
end
