class CommentSerializer < ActiveModel::Serializer
  attributes :id, :content, :username
  # has_one :user
  has_one :post

  def username
    self.object.user.username
  end

end
