source 'https://rubygems.org'

gem 'rake'

# jekyll, which builds it all
# 3.0 includes sass processing
gem 'jekyll', '~>3.1'

# Jekyll extensions
gem 'jekyll-redirect-from'
gem 'jekyll-paginate'

# JSON
gem 'json'

# For `rake watch`
gem 'rb-fsevent'

# For markdown header cleanup
gem 'sanitize', '~>2.0'

# Markdown
gem 'kramdown'

# Syntax highlighting
gem 'rouge'

# algolia
group :jekyll_plugins do
  gem 'algoliasearch-jekyll', '~> 0.8.0'
end

# Avoid having to poll for changes on Windows
gem 'wdm', '>= 0.1.0' if Gem.win_platform?